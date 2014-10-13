class Call < ActiveRecord::Base

  belongs_to :user

  has_many :estimates, dependent: :destroy
  has_many :criterions, through: :estimates
  accepts_nested_attributes_for :estimates
  has_many :reports, dependent: :destroy

  class << self
    attr_accessor :allow_create
  end

  def get_total_score!
    total_score = 0
    self.estimates.each do |e|
      coefficient = e.score.to_i
      weight = Criterion.find_by_id(e.criterion_id.to_i).relative_weight.to_i
      total_score += score = coefficient * weight
    end
    self.total_score = total_score
    self.version = Version.last.value
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

  def create_report!
    json_body = self.as_json(only: [:total_score], include: {estimates: {only: [:score], include: {criterion: { only: [:name, :good_thing, :bad_thing, :relative_weight]}}}})
    report = self.reports.build(data: json_body.to_s)
    report.save
  end

  def fresh?
    self.version == Version.last.value
  end
end
