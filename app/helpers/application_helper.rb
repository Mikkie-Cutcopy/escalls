module ApplicationHelper

  def admin?
    if current_user.present?
      return true if current_user.role == 'admin'
    end
    false
  end
end
