class User < ActiveRecord::Base
  # Include default devise modules. Others available are:

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :timeoutable

  has_many :calls


  def admin?
    self.role.eql?('admin')
  end

  def worker?
    self.role.eql?('worker')
  end
end
