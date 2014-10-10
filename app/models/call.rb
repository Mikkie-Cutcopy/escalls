class Call < ActiveRecord::Base

  belongs_to :user

  has_many :estimates, dependent: :destroy
  has_many :criterions, through: :estimates
  accepts_nested_attributes_for :estimates
  has_many :reports

  class << self
    attr_accessor :allow_create
  end

  def get_total_score!(params)
    total_score = 0
    params[:estimates_attributes].each do |key, hash|
      coefficient = hash['score'].to_i
      weight = Criterion.find_by_id(hash['criterion_id'].to_i).relative_weight.to_i
      total_score += score = coefficient * weight
    end
    self.total_score = total_score
  end

  def check_for_dependencies
    status = true
    objects = []
    unless self.estimates.empty?
      self.estimates.each do |e|
         unless e.criterion
           status = false
           objects << e
         end
      end
    end
    {status: status, objects: objects}
  end

end
