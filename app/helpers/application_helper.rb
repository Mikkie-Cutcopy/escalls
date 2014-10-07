module ApplicationHelper

  def admin?
    if current_user.present?
      return current_user.role == 'admin'
    end
    false
  end
end
