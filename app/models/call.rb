class Call < ActiveRecord::Base

  belongs_to :user

  has_many :estimates
  has_many :criterions, through: :estimates
  accepts_nested_attributes_for :estimates

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

end
