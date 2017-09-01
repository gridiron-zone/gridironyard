class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by_username(params[:username])
    if @user && @user.authenticate(params[:password])
      render json: @user
    else
      render json: {error: "Invalid", status: :unauthorized}
    end
  end

  def destroy
    session[:current_user_id] = nil
    render json: {status: "Logged Out"}
  end

end
