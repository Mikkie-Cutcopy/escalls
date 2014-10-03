class Admin::CallsController < ApplicationController

  before_action :authenticate_user!

  def index
    @calls = Call.all
  end

  def show

  end

end
