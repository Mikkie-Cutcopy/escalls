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

  def destroy
    @user = User.where('id' => params[:id]).first
    @user.destroy
    #binding.pry
    respond_to do |format|
      format.js   {}
      format.json {render json: 'ok'}
    end
    #@user.destroy
    #redirect_to admin_users_path
  end

  def accept
    @user.update_attributes('status'=> 'active', 'role' => 'worker')
    @user.save
    redirect_to admin_users_path
  end

end
