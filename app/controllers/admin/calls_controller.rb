#encoding: utf-8

class Admin::CallsController < ApplicationController

  before_action :authenticate_admin!
  before_action :allow_create_call, only: [:new, :create, :edit, :update, :recount]

  load_and_authorize_resource

  layout 'admin'

  def index
    @workers_scope = User.active_workers.order(full_name: :desc)
    @workers = [User.new(id: nil, full_name: 'Все сотрудники'), @workers_scope].flatten
    params[:call_order] ||= 'created_at'
    @calls = Call.paginate(page: params[:page], per_page: 15).order(params[:call_order] => :desc) #все звонки
    if params[:worker_filter].present?
      @worker = User.find(params[:worker_filter])
      @calls = @calls.where('user_id' => params[:worker_filter]) #звонки сотрудника
    end
    if @calls.empty?
      flash.now[:message_alert] = 'You doesn\'t have calls yet'
    end
  end

  def new
    if User.active_workers.empty?
      flash[:message_alert] = 'Нет активных сотрудников'
      return redirect_to admin_calls_path
    end

    @workers = User.where('role' => 'worker', 'status' => 'active')
    @criterions = Criterion.all.order('id')
    @criterions.each do |criterion|
      @call.estimates.build(score: 1, criterion_id: criterion.id)
    end
  end

  def create
    call = Call.new(call_params)
    unless call.save
      return redirect_to new_admin_call_path(call)
    end
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
      #ищем естимэйты без оценок
      unless @call.estimates.where('criterion_id' => criterion.id).first
        @call.estimates.build(criterion_id: criterion.id)
        @call.non_assign_score = true
      end
    end
    flash.now[:message_alert] = "Есть неоцененные критерии" if @call.non_assign_score
  end

  def update
    @call.update_attributes(call_params)
    @call.save
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
    @call.save
    redirect_to admin_calls_path
  end

  private

  def allow_create_call
    Criterion.amount_check
    return redirect_to admin_criterions_path unless Call.allow_create
  end

  def non_assign_score

  end

  def call_params
    params.require(:call).permit(:date, :user_id, :total_score, :status, :subject, :file_id, :comment, :record, estimates_attributes: [:id, :score, :comment, :criterion_id])
  end

end
