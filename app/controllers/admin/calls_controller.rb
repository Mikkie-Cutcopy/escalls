class Admin::CallsController < ApplicationController

  def index
    @calls = Call.all
  end
end
