class Criterion < ActiveRecord::Base

  has_many :estimates
  has_many :calls, through: :estimates

end
