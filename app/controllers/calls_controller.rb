#encoding: utf-8
class CallsController < ApplicationController

  before_action :authenticate_user!
  load_and_authorize_resource :call

  layout 'user'

  def index
    @calls = Call.where(:user_id => current_user.id).paginate(page: params[:page], per_page: 15).order(created_at: :desc)
    if @calls.empty?
      flash.now[:message_alert] = current_user.worker? ? 'Записей не найдено' : 'Аккаунт не активирован администратором'
    end
  end

  def show
  end

end
