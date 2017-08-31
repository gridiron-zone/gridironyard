class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by_username(params[:username])

    respond_to? do |format|
      if @user && @user.authenticate(params[:user][:password])
        session[:current_user_id] = @user.id
        session[:current_username] = @user.username
        format.html {redirect_to questions_path}
        format.json {render json: {token: @user.api_token}}
      else
        format.html {redirect_to new_user_path, notice: "User not found. Please register new user."}
        format.json {render json: {error: "Invalid"}, status: :unauthorized}
      end
    end
  end

    def destroy
      session[:user_id] = nil
      redirect_to '/'
    end

    end
