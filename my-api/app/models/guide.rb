class Guide < ApplicationRecord
  has_secure_password

  validates_presence_of :email
  validates_uniqueness_of :email

  has_one_attached :picture
  has_many :locations
end
