class User < ActiveRecord::Base
  # Include default devise modules. Others available are:

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :timeoutable

  has_many :calls

  scope :active_workers, -> {where('role' => 'worker', 'status' => 'active')}

  def admin?
    self.role.eql?('admin')
  end

  def worker?
    self.role.eql?('worker')
  end

  def quest?
    self.role.eql?('quest')
  end
end
