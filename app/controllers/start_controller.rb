class StartController < ApplicationController

  before_action :authenticate_user!

  def access
    @user = current_user
    redirect_to user_calls_path(@user)
  end
end
