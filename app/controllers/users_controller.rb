class UsersController < ApplicationController

  def show
    @user = current_user
    render layout: 'application'
  end

end
