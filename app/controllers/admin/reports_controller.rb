class Admin::ReportsController < ApplicationController

  before_action :authenticate_user!
  load_and_authorize_resource

  def index

  end

  def show

  end

  def destroy
  end

end
