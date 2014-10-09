class Admin::CallsController < ApplicationController

  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    @calls = Call.all
  end

  def new
    return redirect_to admin_criterions_path unless Call.allow_create
    @call = Call.new
    @workers = User.where('role' => 'worker')

    @criterions = Criterion.all
    @criterions.each do |criterion|
      e = @call.estimates.build
      e.criterion_id = criterion.id
    end

  end

  def create
    return redirect_to admin_criterions_path unless Call.allow_create
    call = Call.new(call_params)
    call.get_total_score!(call_params)
    call.save
    redirect_to admin_calls_path
  end

  def edit
    Criterion.amount_check
    return redirect_to admin_criterions_path unless Call.allow_create
    @criterions = Criterion.all
    @criterions.each do |criterion|
      unless @call.estimates.where('criterion_id' => criterion.id).first
        e = @call.estimates.build
        e.criterion_id = criterion.id
      end
    end
  end

  def update
    Criterion.amount_check
    return redirect_to admin_criterions_path unless Call.allow_create
    @call.get_total_score!(call_params)
    @call.update_attributes(call_params)
    redirect_to admin_calls_path
  end

  def show

  end


  def recount

  end

  private

  def call_params
    params.require(:call).permit(:date, :user_id, :total_score, :status, :subject, :file_id, :comment, estimates_attributes: [:id, :score, :criterion_id])
  end


end
