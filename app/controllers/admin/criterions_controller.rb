class Admin::CriterionsController < ApplicationController

  before_action :authenticate_user!
  load_and_authorize_resource

  def index
  end

  def new
  end

  def create
  end
end
