class Admin::UsersController < ApplicationController

  before_action :authenticate_user!
  load_and_authorize_resource

  layout 'admin'

  def index
    @workers = User.where('role' => 'worker')
    @new_users = User.where('role' => '')
  end

  def show

  end

  def accept

  end

end
