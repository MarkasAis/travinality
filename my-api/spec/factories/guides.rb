FactoryBot.define do
  factory :guide do
    name { "MyString" }
    origin { "MyString" }
    description { "MyString" }
    phone { "MyString" }
    cur_latitude { 1.5 }
    cur_longitude { 1.5 }
    cur_country { "MyString" }
    cur_city { "MyString" }
    active { false }
  end
end
