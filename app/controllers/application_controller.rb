#encoding: utf-8
class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def not_found
    respond_to do |format|
      format.html {render 'errors/404', status: 404}
    end
  end

  def authenticate_admin!
    authenticate_user!
    unless current_user.admin?
      flash[:message_alert] = 'Нет прав доступа'
      return redirect_to root_path
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:full_name, :status, :email, :password, :password_confirmation, :current_password) }
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:full_name, :role, :email, :password, :password_confirmation) }
  end
end
