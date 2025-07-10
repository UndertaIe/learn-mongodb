// Demonstrates how to open a change stream by using the Go driver
package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	var uri string = "mongodb://root:mymongodb@localhost:27017/"

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
	coll := client.Database("mydb").Collection("tea")

	pipelines := bson.A{
		bson.M{
			"$group": bson.M{
				"_id":           "$category",
				"average_price": bson.M{"$avg": "$price"},
				"type_total":    bson.M{"$sum": 1},
			},
		},
	}
	cur, err := coll.Aggregate(context.Background(), pipelines)
	if err != nil {
		panic(err)
	}
	var results []bson.M
	if err = cur.All(context.Background(), &results); err != nil {
		panic(err)
	}
	fmt.Println(results)

	// docs := []interface{}{
	// 	Tea{Type: "Masala", Category: "black", Toppings: []string{"ginger", "pumpkin spice", "cinnamon"}, Price: 6.75},
	// 	Tea{Type: "Gyokuro", Category: "green", Toppings: []string{"berries", "milk foam"}, Price: 5.65},
	// 	Tea{Type: "English Breakfast", Category: "black", Toppings: []string{"whipped cream", "honey"}, Price: 5.75},
	// 	Tea{Type: "Sencha", Category: "green", Toppings: []string{"lemon", "whipped cream"}, Price: 5.15},
	// 	Tea{Type: "Assam", Category: "black", Toppings: []string{"milk foam", "honey", "berries"}, Price: 5.65},
	// 	Tea{Type: "Matcha", Category: "green", Toppings: []string{"whipped cream", "honey"}, Price: 6.45},
	// 	Tea{Type: "Earl Grey", Category: "black", Toppings: []string{"milk foam", "pumpkin spice"}, Price: 6.15},
	// 	Tea{Type: "Hojicha", Category: "green", Toppings: []string{"lemon", "ginger", "milk foam"}, Price: 5.55},
	// }
	// _, err = coll.InsertMany(context.TODO(), docs)
	// if err != nil {
	// 	panic(err)
	// }
}

type Tea struct {
	Type     string
	Category string
	Toppings []string
	Price    float32
}
