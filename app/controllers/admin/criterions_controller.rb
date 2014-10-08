class Admin::CriterionsController < ApplicationController

  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    @message = amount_check
    @criterions.order!(:id)
    #binding.pry
  end

  def new
  end

  def create
  end

  def change_rw_value
    criterion = Criterion.find_by_id(params[:id])
    criterion.relative_weight = params[:new_relative_weight].to_i
    criterion.save
    redirect_to admin_criterions_path
  end

  private
  def amount_check

    amount = Criterion.amount_check

    case
      when amount < 100
        'To create calls feature is not available. The sum of relative weight is too small: ' + amount.to_s
      when amount > 100
        'To create calls feature is not available. The sum of relative weight is too large: ' + amount.to_s
      else
        nil
    end
    #binding.pry


  end
end
