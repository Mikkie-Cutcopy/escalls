class StartController < ApplicationController

  before_action :authenticate_user!

  def access
    @user = current_user
      if @user.status == 'admin'
        redirect_to admin_calls_path
      else
        redirect_to user_calls_path(@user)
      end

  end
end
