class Ability
  include CanCan::Ability

  def initialize(user)

       user ||= User.new
       if user.admin?
         can :manage, [Call, Criterion, Report, User]
         can :manage, Comment, :user_id => user.id
       elsif user.worker? || user.quest?
         can :read,   Criterion
         can :read,   Call,  :user_id => user.id
         can :manage, Comment, :user_id => user.id
       else
       end

  end
end
