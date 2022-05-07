FactoryBot.define do
  factory :location do
    latitude { 1.5 }
    longitude { 1.5 }
    country { "MyString" }
    city { "MyString" }
  end
end
