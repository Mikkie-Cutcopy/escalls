class Call < ActiveRecord::Base

  belongs_to :user

  has_many :estimates
  has_many :criterions, through: :estimates
  accepts_nested_attributes_for :estimates

end
