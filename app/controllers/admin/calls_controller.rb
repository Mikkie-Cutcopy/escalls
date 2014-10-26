class Admin::CallsController < ApplicationController

  before_action :authenticate_user!
  before_action :allow_create_call, only: [:new, :create, :edit, :update, :recount]

  load_and_authorize_resource

  layout 'admin'

  def index
    @calls = Call.all.order('created_at')
    if @calls.empty?
      flash.now[:message_alert] = 'You doesn\'t have a calls yet'
    end
  end

  def new
    @call = Call.new
    @workers = User.where('role' => 'worker', 'status' => 'active')
    @criterions = Criterion.all.order('id')
    @criterions.each do |criterion|
      e = @call.estimates.build
      e.criterion_id = criterion.id
    end
  end

  def create
    call = Call.new(call_params)
    call.get_total_score!
    call.save
    call.create_report!
    #binding.pry
    redirect_to admin_calls_path
  end

  def edit
    unless @call.check_for_dependencies[:status]
      flash[:message_alert] = 'something went wrong with estimates'
      return redirect_to admin_calls_path
    end
    @workers = User.where('role' => 'worker', 'status' => 'active')
    @criterions = Criterion.all.order('id')
    @criterions.each do |criterion|
      unless @call.estimates.where('criterion_id' => criterion.id).first
        e = @call.estimates.build
        e.criterion_id = criterion.id
      end
    end
    #binding.pry
  end

  def update
    @call.update_attributes(call_params)
    @call.get_total_score!
    @call.save
    @call.create_report!
    redirect_to admin_calls_path
  end

  def show

  end

  def destroy
    @call.destroy
    redirect_to admin_calls_path
  end


  def recount
    unless @call.check_for_dependencies[:status]
      flash[:message_alert] = 'something went wrong with estimates'
      return redirect_to admin_calls_path
    end
    @criterions = Criterion.all
    @criterions.each do |criterion|
      unless @call.estimates.where('criterion_id' => criterion.id).first
        return redirect_to edit_admin_call_path(@call)
        break
      end
    end
    @call.get_total_score!
    @call.save
    @call.create_report!
    redirect_to admin_calls_path
  end

  private

  def allow_create_call
    Criterion.amount_check
    return redirect_to admin_criterions_path unless Call.allow_create
  end

  def call_params
    params.require(:call).permit(:date, :user_id, :total_score, :status, :subject, :file_id, :comment, :record, estimates_attributes: [:id, :score, :criterion_id])
  end

end
