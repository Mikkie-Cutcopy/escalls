class User < ActiveRecord::Base
  # Include default devise modules. Others available are:

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :timeoutable

  has_many :calls


  def admin?
    self.role == 'admin'
  end

  def worker?
    self.role == 'worker'
  end
end
