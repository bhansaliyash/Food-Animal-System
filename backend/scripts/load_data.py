from farm_movement.models import Farm, Movement
import csv
from datetime import datetime

farm_dict ={}

def run():
    with open('data/population.csv') as file:
        reader = csv.reader(file)
        next(reader)

        for row in reader:
            farm_dict[row[1]] = int(row[2])

    
    with open('data/movement.csv') as file:
        reader = csv.reader(file)
        next(reader) 

        Farm.objects.all().delete()
        Movement.objects.all().delete()

        for row in reader:
            print(row)
            farm_origin, _ = Farm.objects.get_or_create(premise_id = row[8], name = row[6], address = row[4], city = row[5], state = row[9], latitude = row[16] , longitude = row[17], postal_code = row[7], total_population = farm_dict[row[8]])

            farm_dest, _ = Farm.objects.get_or_create(premise_id = row[14], name = row[12], address = row[10], city = row[11], state = row[15], latitude = row[16] , longitude = row[17], postal_code = row[13], total_population = farm_dict[row[14]])

            farm_origin.save()
            farm_dest.save()

            shipment_time = datetime.strptime(row[21], '%d-%m-%y').strftime('%Y-%m-%d')

            movement = Movement(company = row[1], origin_premise_id = farm_origin, dest_premise_id = farm_dest, species = row[3], shipment_start_date = shipment_time, items_moved = row[20], reason = row[2])
            
            movement.save()