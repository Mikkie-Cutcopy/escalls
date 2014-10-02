class CallsController < ApplicationController

  before_action :authenticate_user!

  def index
    @users_calls = current_user.calls
  end

  def show

  end

end
