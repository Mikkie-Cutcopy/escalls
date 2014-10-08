class Criterion < ActiveRecord::Base

  has_many :estimates
  has_many :calls, through: :estimates

  def self.amount_check
    amount = self.all.inject(0) {|sum, c| sum + c.relative_weight}
    Call.allow_create = case
      when amount != 100
        false
      else
        true
    end
    amount
  end

end
