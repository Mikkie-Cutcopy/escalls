class CallsController < ApplicationController

  def index
    @users_calls = current_user.calls
  end

  def show

  end

end
