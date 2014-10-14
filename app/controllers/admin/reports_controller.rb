class Admin::ReportsController < ApplicationController

  before_action :authenticate_user!
  load_and_authorize_resource

  layout 'admin'

  def index

  end

  def show

  end

  def destroy
  end

end
