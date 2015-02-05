class Call < ActiveRecord::Base

  has_attached_file :record
  validates_attachment_content_type :record, :content_type => ['audio/mpeg', 'audio/mp3',  'audio/wav'], :message => 'file must be of filetype .mp3', :file_name => { :matches => [/wav\Z/] }

  validates_attachment_size :record, :less_than => 30.megabytes
  #validates :subject, presence: true
  #validates :date, format: {with: /\d{2}-\d{2}-\d{4}\s\d{2}:\d{2}/}

  belongs_to :user

  has_many :estimates, dependent: :destroy
  has_many :criterions, through: :estimates
  accepts_nested_attributes_for :estimates
  has_many :reports, dependent: :destroy

  class << self
    attr_accessor :allow_create
  end

  attr_accessor :non_assign_score, :correct_dependencies

  before_save do
    self.get_total_score!
  end

  after_save do
    self.create_report!
  end

  def get_total_score!
    total_score = 0
    if estimates.map(&:score).count(-2) < 2
      estimates.each do |e|
        coefficient = e.score.to_i
        weight = Criterion.find_by_id(e.criterion_id.to_i).relative_weight.to_i
        total_score += score = coefficient * weight
      end
    end
    self.total_score = total_score
    self.version = Version.last.value
  end

  def check_for_dependencies
    self.correct_dependencies = true
    objects = []
    unless self.estimates.empty?
      self.estimates.each do |e|
         unless e.criterion
           self.correct_dependencies = false
           objects << e
         end
      end
    end
    {status: self.correct_dependencies, objects: objects}
  end

  def create_report!
    json_body = self.as_json(only: [:total_score], include: {estimates: {only: [:score], include: {criterion: { only: [:name, :good_thing, :bad_thing, :relative_weight]}}}})
    report = self.reports.build(data: json_body.to_s)
    report.save
  end

  def fresh?
    self.version.eql?(Version.last.value)
  end

  def new?
    self.id.blank?
  end
end
