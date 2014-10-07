class Admin::UsersController < ApplicationController

  def index
    @workers = User.where('role' => 'worker')
    @new_users = User.where('role' => '')
  end

  def show

  end

  def accept

  end

end
