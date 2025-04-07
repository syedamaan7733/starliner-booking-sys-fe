import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function Alert({
  state,
  setState,
  trigger,
  loading,
  title,
  message,
  id,
}) {
  return (
    <div className="absolute flex justify-center items-center top-0 left-0 h-screen w-full  bg-black/35 z-100">
      <Card className="bg-gray-200 flex justify-center w-[340px]">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>{message}</CardContent>
        <CardFooter className="flex justify-between">
          <Button variant={"outline"} onClick={() => setState(!state)}>
            Cancel
          </Button>
          <Button onClick={trigger} className="bg-red-600 hover:bg-red-800">
            {loading ? <Loader2 className="animate-spin" /> :  id }
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
