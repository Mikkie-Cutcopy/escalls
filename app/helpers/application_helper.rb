module ApplicationHelper

  def admin?
    if current_user.present?
      return true if current_user.status == 'admin'
    end
    false
  end
end
