#encoding: utf-8
class CriterionsController < ApplicationController

  before_action :authenticate_user!
  load_and_authorize_resource

  layout 'user'

  def index
    @criterions.order!(:id)
  end

end
