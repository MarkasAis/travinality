def seed_image(name)
   File.open("#{Rails.root}/seed_images/#{name}.png")
end

Guide.delete_all
ActiveRecord::Base.connection.execute("TRUNCATE guides")

Location.delete_all
ActiveRecord::Base.connection.execute("TRUNCATE locations")

# Warp me in!
#
main = Guide.create({
  name: "Ash Ketchum",
  origin: "Tallinn, Estonia",
  description: "Having been raised in the open fields of Estonia, I have been one with the nature all my life. I mostly travel in remote locations. Find me diving in the coral reefs, hunting grizzly bears, scaling mountains. I know, what a great guy.",
  phone: "+86 610 35 194",
  cur_latitude: 48.856613,
  cur_longitude: 2.352222,
  cur_country: "France",
  cur_loc_name: "Paris, France",
  active: false,
  email: "ash@mail.com",
  password: "ibishard",
  password_confirmation: "ibishard"
})

main.picture.attach(io: seed_image("main"), filename: "main.png")

main_locations = [
  [28.243990, -16.841390, "Tenerife", "Los Gigantes, Tenerife", "2017-09-14"],
  [14.004000, 99.549470, "Thailand", "Kanchanaburi, Thailand", "2018-05-26"],
  [-20.157890, 57.505610, "Mauritius", "Port-Louis, Mauritius", "2018-10-16"]
]

main_locations.length.times do |i|
  Location.create({
      latitude: main_locations[i][0],
      longitude: main_locations[i][1],
      country: main_locations[i][2],
      name: main_locations[i][3],
      guide_id: 1,
      created_at: Date.parse(main_locations[i][4])
  })
end

# Some random guides...

guide_list = [
  ["Shimonoseki, Japan", "+36 55 745 899", "Shimonoseki@mail.com"],
  ["Bokaro Steel City, India", "+353 20 915 7276", "b@mail.com"],
  ["Saqez, Iran", "+36 55 223 691", "c@mail.com"],
  ["Kragujevac, Serbia", "+353 20 916 5182", "d@mail.com"],
  ["Bozhou, China", "+36 55 105 261", "e@mail.com"],
  ["Gwalior, India", "+353 20 911 2710", "f@mail.com"],
  ["Safi, Morocco", "+36 55 956 855", "g@mail.com"],
  ["Foggia, Italy", "+353 20 919 3280", "h@mail.com"],
  ["Villavicencio, Colombia", "+36 55 848 364", "i@mail.com"],
  ["Sheffield, United Kingdom", "+353 20 910 4484", "j@mail.com"],
  ["Essen, Germany", "+36 55 240 759", "k@mail.com"],
  ["Melitopol, Ukraine", "+353 20 918 7160", "l@mail.com"],
  ["Debrecen, Hungary", "+36 55 719 853", "m@mail.com"],
  ["Mar del Plata, Argentina", "+353 20 914 3611", "n@mail.com"],
  ["Caguas, Puerto Rico", "+36 55 688 408", "o@mail.com"]
]

$location_list = [
  # [43.508133, 16.440193, "Croatia", "Split, Croatia"],
  [24.807390, -107.394440, "Mexico", "Culiacán, Mexico"],
  [14.687300, 120.959110, "Philippines", "Malabon, Philippines"],
  [58.006748, 56.228569, "Russian Federation", "Perm, Russian Federation"],
  [-3.732714, -38.526997, "Brazil", "Fortaleza, Brazil"],
  # [14.698220, -17.437160, "Senegal", "Dakar, Senegal"],
  # [55.202919, 28.709629, "Belarus", "Vitebsk, Belarus"],
  [34.108320, -117.294150, "United States", "San Bernardino, United States"],
  # [44.854000, 65.506699, "Kazakhstan", "Kyzylorda, Kazakhstan"],
  [54.597286, -5.930120, "United Kingdom", "Belfast, United Kingdom"],
  # [41.162190, 27.798030, "Turkey", "Corlu, Turkey"],
  # [5.958650, 10.147510, "Cameroon", "Bamenda, Cameroon"],
  # [60.451462, 22.268829, "Finland", "Turku, Finland"],
  [18.217051, 42.499481, "Saudi Arabia", "Abha, Saudi Arabia"],
  # [16.862240, 96.120980, "Myanmar", "Yangon, Myanmar"],
  [35.170490, 138.681030, "Japan", "Fuji, Japan"],
  [26.005430, -80.279720, "United States", "Pembroke Pines, United States"],
  [50.937531, 6.960279, "Germany", "Cologne, Germany"],
  [-38.926040, -68.051570, "Argentina", "Neuquén, Argentina"],
  # [32.879101, -6.911180, "Morocco", "Khouribga, Morocco"]
]

def random_locations
  $location_list.shuffle
end

guide_list.length.times do |i|
  puts(i)

  cur_locations = random_locations()

  guide = Guide.create({
      name: Faker::FunnyName.name,
      origin: guide_list[i][0],
      description: Faker::Lorem.paragraph(6),
      phone: guide_list[i][1],
      cur_latitude: cur_locations[0][0],
      cur_longitude: cur_locations[0][1],
      cur_country: cur_locations[0][2],
      cur_loc_name: cur_locations[0][3],
      active: false,
      email: Faker::Internet.email,
      password: "123456",
      password_confirmation: "123456"
  })

  puts(guide.email)

  guide.picture.attach(io: seed_image("photo#{i+1}"), filename: "photo#{i+1}.png")

  location_count = rand(5)+1
  cur_jd = 2458000

  location_count.times do |j|
    location_id = j+1

    cur_jd += rand(30)+1

    Location.create({
        latitude: cur_locations[location_id][0],
        longitude: cur_locations[location_id][1],
        country: cur_locations[location_id][2],
        name: cur_locations[location_id][3],
        guide_id: guide.id,
        created_at: Date.jd(cur_jd)
    })
  end
end
