class Admin::CriterionsController < ApplicationController

  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    flash.now[:message_alert] = amount_check_and_report
    @criterions.order!(:id)
  end


  def new
    @criterion = Criterion.new
    @criterion.relative_weight = 0
  end

  def create
    Criterion.create(criterion_params)
    redirect_to admin_criterions_path
  end


  def edit
  end

  def update
    @criterion.update!(criterion_params)
    redirect_to admin_criterions_path
  end


  def destroy
    @criterion.destroy
    redirect_to admin_criterions_path
  end

  def change_relative_weight_value #button
    criterion = Criterion.find_by_id(params[:id])
    criterion.relative_weight = params[:new_relative_weight].to_i
    criterion.save
    flash[:message_ok] = 'Everything is OK' unless amount_check_and_report
    redirect_to admin_criterions_path
  end

  private

  def amount_check_and_report
    amount = Criterion.amount_check
    case
      when amount < 100
        'To create calls feature is not available. The sum of relative weights is too small: ' + amount.to_s
      when amount > 100
        'To create calls feature is not available. The sum of relative weights is too large: ' + amount.to_s
      else
        nil
    end
  end

  def criterion_params
    params.require(:criterion).permit(:name, :good_thing, :bad_thing, :relative_weight)
  end
end
