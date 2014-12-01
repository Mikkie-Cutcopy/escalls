class Admin::UsersController < ApplicationController

  before_action :authenticate_user!
  load_and_authorize_resource

  layout 'admin'

  def index
    @workers = User.where('role' => 'worker')
    @new_workers = User.where('role' => '')
  end

  def show
  end

  def destroy
    @user = User.where('id' => params[:id]).first
    value = @user.destroy ? true : false
    render json: {success: value}
  end

  def accept
    @user.update_attributes('status'=> 'active', 'role' => 'worker')
    @user.save
    redirect_to admin_users_path
  end

end
