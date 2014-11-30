class CallsController < ApplicationController

  before_action :authenticate_user!
  load_and_authorize_resource :call

  layout 'user'

  def index
    @calls = Call.where(:user_id => current_user.id).order(created_at: :desc)
    if @calls.empty?
      flash.now[:message_alert] = 'You doesn\'t have a calls yet'
    end
  end

  def show
  end

end
