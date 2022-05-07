require 'rails_helper'

RSpec.describe "locations#destroy", type: :request do
  subject(:make_request) do
    jsonapi_delete "/api/v1/locations/#{location.id}"
  end

  describe 'basic destroy' do
    let!(:location) { create(:location) }

    it 'updates the resource' do
      expect(LocationResource).to receive(:find).and_call_original
      expect {
        make_request
        expect(response.status).to eq(200), response.body
      }.to change { Location.count }.by(-1)
      expect { location.reload }
        .to raise_error(ActiveRecord::RecordNotFound)
      expect(json).to eq('meta' => {})
    end
  end
end
