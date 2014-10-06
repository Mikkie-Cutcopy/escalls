class Ability
  include CanCan::Ability

  def initialize(user)

       user ||= User.new
       if user.admin?
         can :manage, [Call, Criterion]
         can :manage, Comment, :user_id => user.id
       elsif user.worker?
         can :read,   Criterion
         can :read,   Call,  :user_id => user.id
         can :manage, Comment, :user_id => user.id
       else
       end

  end
end
