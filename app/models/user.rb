class User < ApplicationRecord
  # Add these two lines at the top
  before_save { self.email = email.downcase }

  has_many :journal_entries
  has_secure_password

  validates :email, presence: true,
                   uniqueness: { case_sensitive: false },  # Change this line
                   format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, on: :create

  def generate_password_reset_token
    update(
      password_reset_token: SecureRandom.urlsafe_base64,
      password_reset_sent_at: Time.current
    )
  end

  def password_reset_expired?
    password_reset_sent_at.nil? || password_reset_sent_at < 1.hour.ago
  end

  def clear_reset_token
    update(
      password_reset_token: nil,
      password_reset_sent_at: nil
    )
  end
end
