class Admin::CallsController < ApplicationController

  before_action :authenticate_user!
  load_and_authorize_resource

  def index

  end

  def new
    @call = Call.new
    @workers = User.where('role' => 'worker')

    @criterions = Criterion.all
    @criterions.each do |criterion|
      e = @call.estimates.build
      e.criterion_id = criterion.id
    end

  end

  def create

    Call.create(call_params)
    render 'admin/calls/index'

  end

  def show

  end

  private

  def call_params
    params.require(:call).permit(:date, :user_id, :total_score, :status, :subject, :file_id, :comment, estimates: [:score])
  end


end
