-- Sample Users data --

INSERT INTO users(id, f_name, l_name, email, password)
VALUES
('11111111-1111-1111-1111-111111111111', 'Jedd', 'Nugent', 'jeddnugent@gmail.com', 'testPassword123'),
('22222222-2222-2222-2222-222222222222', 'Bukayo', 'Saka', 'BukayoSaka@gmail.com', 'ArsenalPremWinner2026');

-- Sample entry data associated with sample users --

INSERT INTO entrys (
    user_id, item_date, time_consumed, item_desc, consumed_location,
    consumption_company, feeling_prior, feeling_post, self_talk, other_comment
) VALUES
('11111111-1111-1111-1111-111111111111', '2020-12-02', '15:43', 'Cheese Burger', 'In Maccas carpark',
 'Alone', 'Stress, uneasy, desperate', 'gross, greasy, slimey',
 'I am a gross little piggy for eating this', 'I got extra pickles'),

('11111111-1111-1111-1111-111111111111', '2024-06-02', '04:43', 'Leg of Ham', 'Office bathroom cubical',
 'Pattrick', 'Sneaky, subversive, guilty', 'successful, strong, bold',
 'I have never seen Pattrick eat so much, it kind of intimidated me', 'Honey glaze on the ham'),

('11111111-1111-1111-1111-111111111111', '2024-12-02', '07:43', '15 raw cellery sticks', 'In the dark in my Kitchen',
 'With my wife, also in the dark', 'glorious, free, ready', 'satisfied, fixed, whole',
 'I am god incarnate', 'the crunch was amazing'),

('22222222-2222-2222-2222-222222222222', '2020-12-15', '09:48', '12 dino chicken nuggets', 'On my driveway',
 'With my 5 year old', 'glorious, freeing, liberating', 'satisfied, healed, a new man',
 'One day I yearn to be a dino, not nugget', 'why can all food not be dino shaped?');