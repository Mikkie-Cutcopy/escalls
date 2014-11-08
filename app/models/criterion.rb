class Criterion < ActiveRecord::Base

  has_many :estimates, dependent: :destroy
  has_many :calls, through: :estimates

  def self.amount_check
    amount = self.all.inject(0) {|sum, c| sum + c.relative_weight}
    Call.allow_create = amount == 100
    amount
  end

end
