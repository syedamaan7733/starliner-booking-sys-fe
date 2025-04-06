import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { addPassangerDetail } from "@/stores/actions/booking.action";

const BookingFormx = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addPassangerDetail(users));
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name,
      age,
      gender: sex,
    };

    setUsers([...users, newUser]);
    setName("");
    setAge("");
    setSex("");
  };

  return (
    <div className=" w-full mx-auto">
      <Card className="mb-4 ">
        <CardHeader>
          <CardTitle>Add Passanger</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-24">
                <Label htmlFor="name" className="block mb-2">
                  Name
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="flex-1 min-w-20">
                <Label htmlFor="age" className="block mb-2">
                  Age
                </Label>
                <Input
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                />
              </div>

              <div className="flex-1 min-w-24">
                <Label htmlFor="ageSelect" className="block mb-2">
                  Sex
                </Label>
                <Select value={sex} onValueChange={setSex}>
                  <SelectTrigger id="ageSelect">
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent>
                    {["male", "female", "other"].map((num) => (
                      <SelectItem key={num} value={num}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                disabled={users.length >= 7 || (!name && !age && !sex)}
                type="submit"
              >
                Add User
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>

      {users.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="p-3 border rounded flex justify-between items-center"
                >
                  <div className="flex justify-between border-y-2 w-full">
                    <p className="font-medium">{user.name}</p>
                    <div className="flex space-x-4">
                      <p className="text-sm text-gray-500">Age: {user.age}</p>
                      <p className="text-sm text-gray-500">
                        Gender: {user.sex}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingFormx;
