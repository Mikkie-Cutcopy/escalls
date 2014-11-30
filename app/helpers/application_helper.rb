module ApplicationHelper

  def admin?
    if current_user.present?
      return current_user.admin?
    end
    false
  end
end
