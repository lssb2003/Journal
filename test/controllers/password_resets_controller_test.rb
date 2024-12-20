require "test_helper"

class PasswordResetsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:one)
    @user.update(password_reset_token: SecureRandom.hex(10), password_reset_sent_at: Time.now)
    sign_in(@user)
  end

  def sign_in(user)
    post login_path, params: { email: user.email, password: "password123" }
    @auth_token = JSON.parse(response.body)["auth_token"]
  end

  test "should get new" do
    get new_password_reset_path
    assert_response :success
  end

  test "should get create" do
    post password_resets_path, params: { email: @user.email }
    assert_response :success
  end

  test "should get edit" do
    @user.generate_password_reset_token
    get edit_password_reset_path(@user.password_reset_token)
    assert_response :success
  end

  test "should get update" do
  @user.update(password_reset_token: "valid_token", password_reset_sent_at: Time.now)
  patch password_reset_path(@user.password_reset_token),
    params: { current_password: "password123", new_password: "new123" },
    headers: { Authorization: "Bearer #{@auth_token}" }
  assert_response :success
end
end
